import PageContainer from "@/components/page-container/page-container";
import { getNews } from "@/data/news";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PageTitle from "@/components/page-title/page-title";

export default async function Home() {
  const news = await getNews();

  return (
    <PageContainer>
      <PageTitle>News</PageTitle>

      {news.map((item) => {
        const { id, title, content, createdAt, User } = item;
        const { firstName, lastName, imageUrl } = User;

        return (
          <Card key={id}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>
                {new Date(createdAt).toDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{content}</p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={imageUrl as string} />
                  <AvatarFallback>USER</AvatarFallback>
                </Avatar>
                <p>{`${lastName} ${firstName}`}</p>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </PageContainer>
  );
}
