export const useIsHome = () => {
  const route = useRoute();
  const isHome = computed(() => route.name?.startsWith("home"));
  return { isHome };
};
