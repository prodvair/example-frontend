import { ReactNode } from "react";

import { LinkProps } from "next/link";
import { useRouter } from "next/router";

import { styled } from "@/stitches.config";

export const ActiveLinkStyled = styled("a", {
  color: "$black",
  textDecoration: "none",
  display: "flex",
  "& svg": {
    marginRight: 5
  },
  "&:hover": {
    textDecoration: "underline"
  },
});

type ActiveLinkProps = LinkProps & {
  href: string;
  children: ReactNode;
};

function ActiveLink({ children, href, ...props }: ActiveLinkProps) {
  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <ActiveLinkStyled href={href} onClick={handleClick} {...props}>
      {children}
    </ActiveLinkStyled>
  );
}

export default ActiveLink;
