import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// ScrollToTop if you click on something at the bottom of the page, for example in the footer
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
