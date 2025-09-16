"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import {
  loanEditSchema,
  loanCreateSchema,
  calculateLoanDetails,
} from "@/features/loans/loan-schema";
import { normalizeLoan, getTotalPaid } from "@/features/loans";

export async function updateLoan(loanId: string, formData: FormData) {
  try {
    // Parse and validate the form data
    const rawData = {
      loanType: formData.get("loanType"),
      amount: Number(formData.get("amount")),
      interestRate: Number(formData.get("interestRate")),
      termMonths: Number(formData.get("termMonths")),
      paymentFrequency: formData.get("paymentFrequency"),
      purpose: formData.get("purpose") || undefined,
      notes: formData.get("notes") || undefined,
      collateral: formData.get("collateral") || undefined,
      coSignerName: formData.get("coSignerName") || undefined,
      coSignerEmail: formData.get("coSignerEmail") || undefined,
      coSignerPhone: formData.get("coSignerPhone") || undefined,
      status: formData.get("status"),
      applicationDate: new Date(formData.get("applicationDate") as string),
      approvalDate: formData.get("approvalDate")
        ? new Date(formData.get("approvalDate") as string)
        : null,
      disbursementDate: formData.get("disbursementDate")
        ? new Date(formData.get("disbursementDate") as string)
        : null,
      maturityDate: formData.get("maturityDate")
        ? new Date(formData.get("maturityDate") as string)
        : null,
    };

    // Validate the data
    const validatedData = loanEditSchema.parse(rawData);

    // Calculate loan details
    const calculatedFields = calculateLoanDetails(
      validatedData.amount,
      validatedData.interestRate,
      validatedData.termMonths,
      validatedData.paymentFrequency
    );

    // Update the loan in the database
    const updatedLoan = await prisma.loan.update({
      where: { id: loanId },
      data: {
        ...validatedData,
        ...calculatedFields,
      },
    });

    // Revalidate the loan detail page and dashboard
    revalidatePath(`/loans/${loanId}`);
    revalidatePath("/");

    return { success: true, loan: normalizeLoan(updatedLoan) };
  } catch (error) {
    console.error("Error updating loan:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred while updating the loan",
    };
  }
}

export async function createLoan(formData: FormData) {
  try {
    // Parse and validate the form data
    const rawData = {
      borrowerId: formData.get("borrowerId"),
      loanType: formData.get("loanType"),
      amount: Number(formData.get("amount")),
      interestRate: Number(formData.get("interestRate")),
      termMonths: Number(formData.get("termMonths")),
      paymentFrequency: formData.get("paymentFrequency"),
      purpose: formData.get("purpose") || undefined,
      notes: formData.get("notes") || undefined,
      collateral: formData.get("collateral") || undefined,
      coSignerName: formData.get("coSignerName") || undefined,
      coSignerEmail: formData.get("coSignerEmail") || undefined,
      coSignerPhone: formData.get("coSignerPhone") || undefined,
      status: formData.get("status"),
      applicationDate: new Date(formData.get("applicationDate") as string),
      approvalDate: formData.get("approvalDate")
        ? new Date(formData.get("approvalDate") as string)
        : null,
      disbursementDate: formData.get("disbursementDate")
        ? new Date(formData.get("disbursementDate") as string)
        : null,
      maturityDate: formData.get("maturityDate")
        ? new Date(formData.get("maturityDate") as string)
        : null,
    };

    // Validate the data
    const validatedData = loanCreateSchema.parse(rawData);

    // Calculate loan details
    const calculatedFields = calculateLoanDetails(
      validatedData.amount,
      validatedData.interestRate,
      validatedData.termMonths,
      validatedData.paymentFrequency
    );

    // Generate loan number
    const loanCount = await prisma.loan.count();
    const loanNumber = `LN-${String(loanCount + 1).padStart(6, "0")}`;

    // Create the loan in the database
    const { borrowerId, ...loanData } = validatedData;
    const newLoan = await prisma.loan.create({
      data: {
        loanNumber,
        borrowerId,
        ...loanData,
        ...calculatedFields,
      },
    });

    // Revalidate the dashboard
    revalidatePath("/");

    return { success: true, loan: normalizeLoan(newLoan) };
  } catch (error) {
    console.error("Error creating loan:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred while creating the loan",
    };
  }
}

export async function getAllLoans() {
  try {
    const loans = await prisma.loan.findMany({
      take: 50,
      include: {
        borrower: true,
        payments: {
          where: {
            status: "PAID",
          },
          select: {
            amount: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const transformedLoans = loans.map(({ payments, ...loan }) => ({
      ...normalizeLoan(loan),
      totalPaid: getTotalPaid(payments),
    }));

    return transformedLoans;
  } catch (error) {
    console.error("Error fetching loans:", error);
    return [];
  }
}

export async function getLoanForEdit(loanId: string) {
  try {
    const loan = await prisma.loan.findUnique({
      where: { id: loanId },
      include: {
        borrower: true,
      },
    });

    if (!loan) {
      return null;
    }

    return normalizeLoan(loan);
  } catch (error) {
    console.error("Error fetching loan:", error);
    return null;
  }
}
