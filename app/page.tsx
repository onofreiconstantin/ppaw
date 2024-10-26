import { getUsers } from "@data/users";
import { getUserSubscriptions } from "@data/usersSubscriptions";

export default async function Home() {
  const users = await getUsers();

  console.log("Users -> ", JSON.stringify(users));

  if (users.length) {
    const userId = users[0].id;
    const usersSubscriptions = await getUserSubscriptions(userId);

    console.log("User subscriptions -> ", JSON.stringify(usersSubscriptions));
  }

  return (
    <div>
      <main>MAIN</main>
      <footer>FOOTER</footer>
    </div>
  );
}
