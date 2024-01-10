"use client";

import React from "react";
import styles from "./pagination.module.css";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ page, hasPrev, hasNext }) => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const extraParam = categoryParam ? `&category=${categoryParam}` : "";

  const router = useRouter();
  return (
    <div className={styles.pagination}>
      <button
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${--page}${extraParam}`)}
        className={`${styles.prevBtn} ${styles.btn}`}
      >
        <span
          style={{ fontSize: ".9rem" }}
          className="material-symbols-outlined "
        >
          arrow_back_ios
        </span>
        Prev
      </button>
      <button
        disabled={!hasNext}
        onClick={() => router.push(`?page=${++page}${extraParam}`)}
        className={`${styles.nextBtn} ${styles.btn}`}
      >
        Next
        <span
          style={{ fontSize: ".9rem" }}
          className="material-symbols-outlined "
        >
          arrow_forward_ios
        </span>
      </button>
    </div>
  );
};

export default Pagination;
