export const getClassnames = (classnames: (string | boolean | undefined)[]) => {
  return classnames.filter(Boolean).join(" ");
};

export const getGuardWindow = () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  const guardDocument = document;

  const guardWindow = guardDocument?.defaultView;

  if (guardWindow) {
    return guardWindow;
  }

  return window;
};
