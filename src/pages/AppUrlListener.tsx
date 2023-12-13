import { App, URLOpenListenerEvent } from "@capacitor/app";
import React, { useEffect } from "react";

const AppUrlListener: React.FC<any> = () => {
  useEffect(() => {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      console.log("Url: " + event.url);
      const slug = event.url.split('.fun').pop();
      if (slug) {
        location.href = slug;
      }
    });
  }, []);

  return null;
};

export default AppUrlListener;