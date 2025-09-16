import { getRandomUser, getAllUsers } from "@/features/users";
import { LoanCreateForm } from "@/features/loans/components/form/create-loan";

export default async function NewLoanPage() {
  // Get a random user to pre-populate the form
  const randomUser = await getRandomUser();

  // Get all users for the dropdown
  const users = await getAllUsers();

  return <LoanCreateForm users={users} preSelectedUser={randomUser} />;
}
