export const useMobileNav = () => {
  const showMobileNav = useState("showMobileNav", () => false);
  const { isDesktop } = useScreen();

  const openMobileNav = () => {
    showMobileNav.value = true;
  };

  const closeMobileNav = () => {
    showMobileNav.value = false;
  };

  watch(isDesktop, (val) => {
    if (val) showMobileNav.value = false;
  });

  return {
    showMobileNav,
    openMobileNav,
    closeMobileNav,
  };
};
