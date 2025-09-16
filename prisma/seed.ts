import prisma from "../lib/prisma";
import { LoanType, LoanStatus, PaymentFrequency } from "@prisma/client";

async function main() {
  console.log("🌱 Seeding database with 15 loan entries and payment data...");

  // Create sample users first
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "john.smith@example.com" },
      update: {},
      create: {
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "+1-555-0123",
        address: "123 Main St, Anytown, USA",
      },
    }),
    prisma.user.upsert({
      where: { email: "sarah.johnson@example.com" },
      update: {},
      create: {
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        phone: "+1-555-0456",
        address: "456 Oak Ave, Somewhere, USA",
      },
    }),
    prisma.user.upsert({
      where: { email: "mike.davis@example.com" },
      update: {},
      create: {
        name: "Mike Davis",
        email: "mike.davis@example.com",
        phone: "+1-555-0789",
        address: "789 Pine St, Elsewhere, USA",
      },
    }),
    prisma.user.upsert({
      where: { email: "emma.wilson@example.com" },
      update: {},
      create: {
        name: "Emma Wilson",
        email: "emma.wilson@example.com",
        phone: "+1-555-0321",
        address: "321 Elm St, Springfield, USA",
      },
    }),
    prisma.user.upsert({
      where: { email: "david.brown@example.com" },
      update: {},
      create: {
        name: "David Brown",
        email: "david.brown@example.com",
        phone: "+1-555-0654",
        address: "654 Maple Dr, Riverside, USA",
      },
    }),
    prisma.user.upsert({
      where: { email: "lisa.garcia@example.com" },
      update: {},
      create: {
        name: "Lisa Garcia",
        email: "lisa.garcia@example.com",
        phone: "+1-555-0987",
        address: "987 Cedar Ln, Lakeside, USA",
      },
    }),
    prisma.user.upsert({
      where: { email: "robert.miller@example.com" },
      update: {},
      create: {
        name: "Robert Miller",
        email: "robert.miller@example.com",
        phone: "+1-555-1357",
        address: "357 Birch Ave, Mountain View, USA",
      },
    }),
    prisma.user.upsert({
      where: { email: "jennifer.taylor@example.com" },
      update: {},
      create: {
        name: "Jennifer Taylor",
        email: "jennifer.taylor@example.com",
        phone: "+1-555-2468",
        address: "468 Willow Way, Valley City, USA",
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} sample users`);

  // Create 15 sample loans
  const loans = await Promise.all([
    // Loan 1 - Personal loan with payments
    prisma.loan.upsert({
      where: { loanNumber: "LOAN-001" },
      update: {},
      create: {
        loanNumber: "LOAN-001",
        borrowerId: users[0].id,
        loanType: LoanType.PERSONAL,
        amount: 25000.0,
        interestRate: 0.0525, // 5.25%
        termMonths: 36,
        paymentFrequency: PaymentFrequency.MONTHLY,
        monthlyPayment: 752.28,
        totalInterest: 2082.08,
        totalAmount: 27082.08,
        status: LoanStatus.ACTIVE,
        applicationDate: new Date("2024-01-15"),
        approvalDate: new Date("2024-01-20"),
        disbursementDate: new Date("2024-01-25"),
        maturityDate: new Date("2027-01-25"),
        purpose: "Home improvement",
        riskScore: 75,
        aiRecommendation: "Low risk - good credit history",
      },
    }),
    // Loan 2 - Business loan pending
    prisma.loan.upsert({
      where: { loanNumber: "LOAN-002" },
      update: {},
      create: {
        loanNumber: "LOAN-002",
        borrowerId: users[1].id,
        loanType: LoanType.BUSINESS,
        amount: 100000.0,
        interestRate: 0.0675, // 6.75%
        termMonths: 60,
        paymentFrequency: PaymentFrequency.MONTHLY,
        monthlyPayment: 1970.0,
        totalInterest: 18200.0,
        totalAmount: 118200.0,
        status: LoanStatus.PENDING,
        applicationDate: new Date("2024-02-01"),
        purpose: "Equipment purchase",
        riskScore: 65,
        aiRecommendation: "Medium risk - new business",
      },
    }),
    // Loan 3 - Auto loan with payments
    prisma.loan.upsert({
      where: { loanNumber: "LOAN-003" },
      update: {},
      create: {
        loanNumber: "LOAN-003",
        borrowerId: users[2].id,
        loanType: LoanType.AUTO,
        amount: 35000.0,
        interestRate: 0.0425, // 4.25%
        termMonths: 48,
        paymentFrequency: PaymentFrequency.MONTHLY,
        monthlyPayment: 794.5,
        totalInterest: 3136.0,
        totalAmount: 38136.0,
        status: LoanStatus.ACTIVE,
        applicationDate: new Date("2024-01-10"),
        approvalDate: new Date("2024-01-12"),
        disbursementDate: new Date("2024-01-15"),
        maturityDate: new Date("2028-01-15"),
        purpose: "Vehicle purchase",
        riskScore: 85,
        aiRecommendation: "Very low risk - excellent credit",
      },
    }),
    // Loan 4 - Mortgage with payments
    prisma.loan.upsert({
      where: { loanNumber: "LOAN-004" },
      update: {},
      create: {
        loanNumber: "LOAN-004",
        borrowerId: users[3].id,
        loanType: LoanType.MORTGAGE,
        amount: 450000.0,
        interestRate: 0.0325, // 3.25%
        termMonths: 360,
        paymentFrequency: PaymentFrequency.MONTHLY,
        monthlyPayment: 1960.0,
        totalInterest: 255600.0,
        totalAmount: 705600.0,
        status: LoanStatus.ACTIVE,
        applicationDate: new Date("2023-06-01"),
        approvalDate: new Date("2023-06-15"),
        disbursementDate: new Date("2023-07-01"),
        maturityDate: new Date("2053-07-01"),
        purpose: "Primary residence",
        riskScore: 80,
        aiRecommendation: "Low risk - stable income",
      },
    }),
    // Loan 5 - Student loan with payments
    prisma.loan.upsert({
      where: { loanNumber: "LOAN-005" },
      update: {},
      create: {
        loanNumber: "LOAN-005",
        borrowerId: users[4].id,
        loanType: LoanType.STUDENT,
        amount: 15000.0,
        interestRate: 0.035, // 3.50%
        termMonths: 120,
        paymentFrequency: PaymentFrequency.MONTHLY,
        monthlyPayment: 148.0,
        totalInterest: 2760.0,
        totalAmount: 17760.0,
        status: LoanStatus.ACTIVE,
        applicationDate: new Date("2023-08-15"),
        approvalDate: new Date("2023-08-20"),
        disbursementDate: new Date("2023-09-01"),
        maturityDate: new Date("2033-09-01"),
        purpose: "Education expenses",
        riskScore: 70,
        aiRecommendation: "Medium risk - recent graduate",
      },
    }),
    // Loan 6 - Personal loan completed
    prisma.loan.upsert({
      where: { loanNumber: "LOAN-006" },
      update: {},
      create: {
        loanNumber: "LOAN-006",
        borrowerId: users[5].id,
        loanType: LoanType.PERSONAL,
        amount: 10000.0,
        interestRate: 0.0625, // 6.25%
        termMonths: 24,
        paymentFrequency: PaymentFrequency.MONTHLY,
        monthlyPayment: 444.0,
        totalInterest: 656.0,
        totalAmount: 10656.0,
        status: LoanStatus.COMPLETED,
        applicationDate: new Date("2022-03-01"),
        approvalDate: new Date("2022-03-05"),
        disbursementDate: new Date("2022-03-10"),
        maturityDate: new Date("2024-03-10"),
        purpose: "Debt consolidation",
        riskScore: 60,
        aiRecommendation: "Medium risk - average credit",
      },
    }),
    // Loan 7 - Business loan with payments
    prisma.loan.upsert({
      where: { loanNumber: "LOAN-007" },
      update: {},
      create: {
        loanNumber: "LOAN-007",
        borrowerId: users[6].id,
        loanType: LoanType.BUSINESS,
        amount: 75000.0,
        interestRate: 0.055, // 5.50%
        termMonths: 36,
        paymentFrequency: PaymentFrequency.MONTHLY,
        monthlyPayment: 2265.0,
        totalInterest: 6540.0,
        totalAmount: 81540.0,
        status: LoanStatus.ACTIVE,
        applicationDate: new Date("2023-11-01"),
        approvalDate: new Date("2023-11-10"),
        disbursementDate: new Date("2023-11-15"),
        maturityDate: new Date("2026-11-15"),
        purpose: "Working capital",
        riskScore: 72,
        aiRecommendation: "Low-medium risk - established business",
      },
    }),
    // Loan 8 - Auto loan rejected
    prisma.loan.upsert({
      where: { loanNumber: "LOAN-008" },
      update: {},
      create: {
        loanNumber: "LOAN-008",
        borrowerId: users[7].id,
        loanType: LoanType.AUTO,
        amount: 28000.0,
        interestRate: 0.085, // 8.50%
        termMonths: 60,
        paymentFrequency: PaymentFrequency.MONTHLY,
        monthlyPayment: 575.0,
        totalInterest: 6500.0,
        totalAmount: 34500.0,
        status: LoanStatus.REJECTED,
        applicationDate: new Date("2024-01-20"),
        purpose: "Vehicle purchase",
        riskScore: 45,
        aiRecommendation: "High risk - poor credit history",
      },
    }),
    // Loan 9 - Personal loan with payments
    prisma.loan.upsert({
      where: { loanNumber: "LOAN-009" },
      update: {},
      create: {
        loanNumber: "LOAN-009",
        borrowerId: users[0].id,
        loanType: LoanType.PERSONAL,
        amount: 18000.0,
        interestRate: 0.0475, // 4.75%
        termMonths: 48,
        paymentFrequency: PaymentFrequency.MONTHLY,
        monthlyPayment: 412.0,
        totalInterest: 1776.0,
        totalAmount: 19776.0,
        status: LoanStatus.ACTIVE,
        applicationDate: new Date("2023-09-15"),
        approvalDate: new Date("2023-09-20"),
        disbursementDate: new Date("2023-09-25"),
        maturityDate: new Date("2027-09-25"),
        purpose: "Medical expenses",
        riskScore: 78,
        aiRecommendation: "Low risk - good payment history",
      },
    }),
    // Loan 10 - Mortgage pending
    prisma.loan.upsert({
      where: { loanNumber: "LOAN-010" },
      update: {},
      create: {
        loanNumber: "LOAN-010",
        borrowerId: users[1].id,
        loanType: LoanType.MORTGAGE,
        amount: 320000.0,
        interestRate: 0.0375, // 3.75%
        termMonths: 300,
        paymentFrequency: PaymentFrequency.MONTHLY,
        monthlyPayment: 1485.0,
        totalInterest: 125500.0,
        totalAmount: 445500.0,
        status: LoanStatus.PENDING,
        applicationDate: new Date("2024-02-15"),
        purpose: "Investment property",
        riskScore: 68,
        aiRecommendation: "Medium risk - investment property",
      },
    }),
    // Loan 11 - Student loan defaulted
    prisma.loan.upsert({
      where: { loanNumber: "LOAN-011" },
      update: {},
      create: {
        loanNumber: "LOAN-011",
        borrowerId: users[2].id,
        loanType: LoanType.STUDENT,
        amount: 25000.0,
        interestRate: 0.045, // 4.50%
        termMonths: 180,
        paymentFrequency: PaymentFrequency.MONTHLY,
        monthlyPayment: 195.0,
        totalInterest: 10100.0,
        totalAmount: 35100.0,
        status: LoanStatus.DEFAULTED,
        applicationDate: new Date("2020-01-15"),
        approvalDate: new Date("2020-01-20"),
        disbursementDate: new Date("2020-02-01"),
        maturityDate: new Date("2035-02-01"),
        purpose: "Graduate studies",
        riskScore: 30,
        aiRecommendation: "High risk - payment history issues",
      },
    }),
    // Loan 12 - Business loan with payments
    prisma.loan.upsert({
      where: { loanNumber: "LOAN-012" },
      update: {},
      create: {
        loanNumber: "LOAN-012",
        borrowerId: users[3].id,
        loanType: LoanType.BUSINESS,
        amount: 50000.0,
        interestRate: 0.0625, // 6.25%
        termMonths: 24,
        paymentFrequency: PaymentFrequency.MONTHLY,
        monthlyPayment: 2220.0,
        totalInterest: 3280.0,
        totalAmount: 53280.0,
        status: LoanStatus.ACTIVE,
        applicationDate: new Date("2023-12-01"),
        approvalDate: new Date("2023-12-08"),
        disbursementDate: new Date("2023-12-15"),
        maturityDate: new Date("2025-12-15"),
        purpose: "Inventory purchase",
        riskScore: 75,
        aiRecommendation: "Low risk - seasonal business",
      },
    }),
    // Loan 13 - Auto loan cancelled
    prisma.loan.upsert({
      where: { loanNumber: "LOAN-013" },
      update: {},
      create: {
        loanNumber: "LOAN-013",
        borrowerId: users[4].id,
        loanType: LoanType.AUTO,
        amount: 22000.0,
        interestRate: 0.0525, // 5.25%
        termMonths: 48,
        paymentFrequency: PaymentFrequency.MONTHLY,
        monthlyPayment: 510.0,
        totalInterest: 2480.0,
        totalAmount: 24480.0,
        status: LoanStatus.CANCELLED,
        applicationDate: new Date("2024-01-05"),
        purpose: "Vehicle purchase",
        riskScore: 70,
        aiRecommendation: "Medium risk - applicant withdrew",
      },
    }),
    // Loan 14 - Personal loan with payments
    prisma.loan.upsert({
      where: { loanNumber: "LOAN-014" },
      update: {},
      create: {
        loanNumber: "LOAN-014",
        borrowerId: users[5].id,
        loanType: LoanType.PERSONAL,
        amount: 12000.0,
        interestRate: 0.0575, // 5.75%
        termMonths: 36,
        paymentFrequency: PaymentFrequency.MONTHLY,
        monthlyPayment: 365.0,
        totalInterest: 1140.0,
        totalAmount: 13140.0,
        status: LoanStatus.ACTIVE,
        applicationDate: new Date("2023-10-01"),
        approvalDate: new Date("2023-10-05"),
        disbursementDate: new Date("2023-10-10"),
        maturityDate: new Date("2026-10-10"),
        purpose: "Home renovation",
        riskScore: 82,
        aiRecommendation: "Low risk - excellent credit score",
      },
    }),
    // Loan 15 - Other loan type
    prisma.loan.upsert({
      where: { loanNumber: "LOAN-015" },
      update: {},
      create: {
        loanNumber: "LOAN-015",
        borrowerId: users[6].id,
        loanType: LoanType.OTHER,
        amount: 8000.0,
        interestRate: 0.0725, // 7.25%
        termMonths: 18,
        paymentFrequency: PaymentFrequency.MONTHLY,
        monthlyPayment: 485.0,
        totalInterest: 730.0,
        totalAmount: 8730.0,
        status: LoanStatus.APPROVED,
        applicationDate: new Date("2024-02-10"),
        approvalDate: new Date("2024-02-15"),
        purpose: "Emergency fund",
        riskScore: 55,
        aiRecommendation: "Medium-high risk - unsecured loan",
      },
    }),
  ]);

  console.log(`✅ Created ${loans.length} sample loans`);

  // Create payments for 5 specific loans (loans with ACTIVE status that have disbursement dates)
  const loansWithPayments = loans
    .filter(
      (loan) => loan.status === LoanStatus.ACTIVE && loan.disbursementDate
    )
    .slice(0, 5); // Take first 5 active loans

  let totalPayments = 0;

  for (const loan of loansWithPayments) {
    const payments = [];
    const monthlyPayment = Number(loan.monthlyPayment);
    const disbursementDate = loan.disbursementDate!;
    const termMonths = loan.termMonths;

    // Create payments for the first 6 months of each loan
    for (let i = 1; i <= Math.min(6, termMonths); i++) {
      const paymentDate = new Date(disbursementDate);
      paymentDate.setMonth(paymentDate.getMonth() + i);

      // Calculate principal and interest amounts (simplified calculation)
      const remainingBalance = Number(loan.amount) - monthlyPayment * (i - 1);
      const interestAmount =
        (remainingBalance * Number(loan.interestRate)) / 12;
      const principalAmount = monthlyPayment - interestAmount;

      const reference = `PAY-${loan.loanNumber}-${i
        .toString()
        .padStart(3, "0")}`;

      // Check if payment already exists
      const existingPayment = await prisma.payment.findFirst({
        where: { reference: reference },
      });

      if (!existingPayment) {
        payments.push({
          loanId: loan.id,
          amount: monthlyPayment,
          principalAmount: Math.max(0, principalAmount),
          interestAmount: Math.max(0, interestAmount),
          paymentDate: paymentDate,
          dueDate: paymentDate,
          status: "PAID",
          paymentMethod: "BANK_TRANSFER",
          reference: reference,
        });
      }
    }

    // Create only new payments for this loan
    if (payments.length > 0) {
      const createdPayments = await Promise.all(
        payments.map((payment) => prisma.payment.create({ data: payment }))
      );

      totalPayments += createdPayments.length;
      console.log(
        `✅ Created ${createdPayments.length} new payments for ${loan.loanNumber}`
      );
    } else {
      console.log(
        `⏭️  All payments already exist for ${loan.loanNumber}, skipping...`
      );
    }
  }

  console.log(`✅ Created ${totalPayments} total sample payments`);
  console.log("🎉 Database seeding completed!");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
