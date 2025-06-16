import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import AppNav from "./AppLink";
import { HOME } from "@/data/links";

type Props = {
    className?: string;
}

export default function Logo(props: Props) {
    return (
      <AppNav
        href={HOME}
        className={clsx("header-logo block max-w-full", props.className)}
      >
        <Image
            src="/images/logo/logo-dark.svg"
            alt="logo"
            width={140}
            height={30}
            className="w-full dark:hidden"
        />
        <Image
            src="/images/logo/logo.svg"
            alt="logo"
            width={140}
            height={30}
            className="hidden w-full dark:block"
        />
      </AppNav>
    );
}
