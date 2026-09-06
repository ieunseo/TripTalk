"use client";

import { useApolloClient, useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { FETCH_USER_LOGGED_IN } from "@/graphql/queries";
import { useAuthStore } from "@/store/useStore";
import styles from "./styles.module.css";

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const client = useApolloClient();
  const accessToken = useAuthStore((state) => state.accessToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);



  const { data,loading, error,refetch } = useQuery(FETCH_USER_LOGGED_IN, {
    skip: !accessToken,
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    // 토큰이 없거나 서버 검증에 실패하면 로그인 화면으로 이동해요.
    if (accessToken === "" || error) {
      void client.clearStore();
      router.replace("/login");
    }
  }, [accessToken, client, router]);

 if (!accessToken || loading) {
      return (
          <main className={styles.loading}>
            로그인 정보를 확인하고 있어요.
          </main>
      );
    }

    if (error || !data) {
      return (
          <main className={styles.loading}>
            <p>로그인 정보를 확인하지 못했어요.</p>

            <button
                type="button"
                onClick={() => {
                  void refetch().catch(() => {});
                }}
            >
              다시 확인
            </button>

            <button type="button" onClick={() => clearAuth()}>
              다시 로그인
            </button>
          </main>
      );
    }

  return children;

}