import Image from "next/image";
import {ReactNode, Suspense} from "react";
import { StoreProvider } from "./StoreProvider";
import { Nav } from "./components/Nav";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";

interface Props {
   children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
        <Suspense>
          <section className={styles.container}>
            <Nav/>

            <main className={styles.main}>{children}</main>

            <footer className={styles.footer}>
              <span>&#169;Copyright by e-commerce</span>
            </footer>
          </section>
        </Suspense>
        </body>
      </html>
    </StoreProvider>
  );
}
