import { auth } from '@/auth.config';
import { Title } from '@/components';
import { titleFont } from '@/config/fonts';
import { User } from '@/interfaces';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();


  if (!session?.user) {
    // redirect('/auth/login?returnTo=/profile');
    redirect("/");
  }
  const user = session.user as User

  return (
    <div>
      <Title title="Profile" />
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Title title="Perfil" />
      <div className="flex flex-row gap-10">
        { user.image &&
          <Image className="rounded-full border-puebla-dark border-4" src={session.user.image} width={100} height={100} alt='profile picture'/>
        }
        <div className="">
          <h2 className={`${titleFont.className} font-semibold text-xl`}>{session.user.name}</h2>
          <span>{user.role}</span>
          <span>{user.email}</span>
        </div>
        
      </div>
    </div>
  );
}
