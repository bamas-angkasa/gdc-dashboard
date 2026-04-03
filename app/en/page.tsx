import { getDictionary } from "@/lib/i18n";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import HowItWorks from "@/components/landing/HowItWorks";
import CTA from "@/components/landing/CTA";

export default function EnglishHome() {
  const dict = getDictionary("en");

  return (
    <>
      <Navbar dict={dict} locale="en" />
      <Hero dict={dict} locale="en" />
      <Services dict={dict} />
      <HowItWorks dict={dict} />
      <CTA dict={dict} />
      <Footer dict={dict} />
    </>
  );
}
