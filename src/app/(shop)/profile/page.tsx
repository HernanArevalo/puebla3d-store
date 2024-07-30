import { auth } from '@/auth.config';
import { CodesTable, Title } from '@/components';
import { titleFont } from '@/config/fonts';
import { User } from '@/interfaces';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const user = session.user as User

  return (
    <div className="flex flex-col gap-4 h-full">
      <Title title="Perfil" />
      <div className="flex flex-row gap-10 items-center">
        { user.image &&
          <Image className="rounded-full border-puebla-dark border-4" src={user.image} width={100} height={100} alt='profile picture' />
        }
        <div className="">
          <div className="flex flex-row items-center gap-3">
            <h2 className={`${titleFont.className} font-semibold text-xl`}>{session.user.name}</h2>
            <span className="bg-gray-500 bg-opacity-60 p-1 text-xs">{user.role}</span>
          </div>
          <span>{user.email}</span>
        </div>
      </div>

      <div>
        <Title title="Órdenes" />
        <CodesTable />
      </div>
    </div>
  );
}
