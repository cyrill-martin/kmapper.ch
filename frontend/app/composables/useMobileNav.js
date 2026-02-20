export const useMobileNav = () => {
  const showMobileNav = useState("showMobileNav", () => false);

  const openMobileNav = () => {
    console.log("before open - showMobileNav:", showMobileNav.value);
    showMobileNav.value = true;
    console.log("after open - showMobileNav:", showMobileNav.value);
  };

  const closeMobileNav = () => {
    console.log("before close - showMobileNav:", showMobileNav.value);
    showMobileNav.value = false;
    console.log("after close - showMobileNav:", showMobileNav.value);
  };

  return {
    showMobileNav,
    openMobileNav,
    closeMobileNav,
  };
};
