import { titleFont } from "@/config/fonts";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div
      className={`mt-3 ${className}`}
    >
      <h1 className={`${titleFont.className} antialiased text-4xl font-semibold my-7`}>
        {title}
      </h1>

      {subtitle && (
        <h3 className="text-xl mb-10">
          {subtitle}
        </h3>
      )}
    </div>
  )
}
export const TitleNM = ({ title, subtitle, className }: Props) => {
  return (
    <div
      className={`mt-3 ${className}`}
    >
      <h1 className={`${titleFont.className} antialiased text-4xl font-semibold mt-7`}>
        {title}
      </h1>

      {subtitle && (
        <h3 className="text-xl mb-10">
          {subtitle}
        </h3>
      )}
    </div>
  )
}

export const SubtitleNM = ({ title, subtitle, className }: Props) => {
  return (
    <div
      className={`${className}`}
    >
      <h1 className={`${titleFont.className} antialiased text-2xl font-normal`}>
        {title}
      </h1>

      {subtitle && (
        <h3 className="text-xl mb-10">
          {subtitle}
        </h3>
      )}
    </div>
  )
}

export const SubTitle = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1 className={`${titleFont.className} antialiased text-xl font-semibold mb-4`}>
        {title}
      </h1>
      {subtitle && (
        <h3 className="text-xl mb-10">
          {subtitle}
        </h3>
      )}
    </div>
  );
};