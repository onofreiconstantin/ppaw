import { getUsers } from "@data/users";
import { getUserSubscriptions } from "@data/usersSubscriptions";

export default async function Home() {
  const { data: usersData } = await getUsers();

  console.log("Users -> ", JSON.stringify(usersData));

  if (usersData) {
    const userId = usersData.users[0].id;
    const { data } = await getUserSubscriptions(userId);

    console.log("User subscriptions -> ", JSON.stringify(data));
  }

  return (
    <div>
      <main>MAIN</main>
      <footer>FOOTER</footer>
    </div>
  );
}
