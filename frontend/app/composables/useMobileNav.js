export const useMobileNav = () => {
  const showMobileNav = useState("showMobileNav", () => false);

  const toggleMobileNav = () => {
    showMobileNav.value = !showMobileNav.value;
  };

  return {
    showMobileNav,
    toggleMobileNav,
  };
};
