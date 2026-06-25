"use client";

import { useEffect, useState } from "react";
import DSAHeader from "@/components/dashboard/sections/dsa/DsaHeader";
import DSAStats from "@/components/dashboard/sections/dsa/DsaStats";
import DSAToolbar from "@/components/dashboard/sections/dsa/DsaToolbar";
import DSACard from "@/components/dashboard/sections/dsa/DsaCard";
import DSACardSkeleton from "@/components/dashboard/skeleton/DsaCard";
import EmptyProjects from "@/components/dashboard/sections/projects/EmptyProjects";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

interface DSAItem {
  _id: string;
  title: string;
  subtitle: string;
  desc: string;
  progress: string;
  category: "leetcode" | "striver" | "codeforces" | "gfg" | "custom";
  problemsSolved: number;
  featured: boolean;
  order: number;
  createdAt?: string;
}

interface Pagination {
  totalProjects: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const DSA = () => {
  const [dsaList, setDsaList] = useState<DSAItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination>({
    totalProjects: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 3,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchDSA = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        page: String(page),
        limit: "6",
        search,
      });

      if (activeFilter === "featured") {
        query.append("featured", "true");
      } else {
        query.append("category", activeFilter);
      }

      const response = await fetch(`/api/dsa?${query}`);

      if (!response.ok) {
        throw new Error("Failed to fetch DSA entries");
      }

      const data = await response.json();

      setDsaList(data.dsa || []);

      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDSA();
  }, [page, search, activeFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, activeFilter]);

  const handleDeleteDSA = (id: string) => {
    setDsaList((prev) => prev.filter((item) => item._id !== id));

    setPagination((prev) => ({
      ...prev,

      totalProjects: prev.totalProjects - 1,
    }));
    fetchDSA();
  };

  return (
    <section className="space-y-8">
      <DSAHeader />
      <DSAStats />
      <DSAToolbar
        search={search}
        setSearch={setSearch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      {loading ? (
        <div className={"grid gap-6 sm:grid-cols-2 xl:grid-cols-3"}>
          {Array.from({ length: 3 }).map((_, index) => (
            <DSACardSkeleton key={index} />
          ))}
        </div>
      ) : dsaList.length === 0 ? (
        <EmptyProjects
          title="No DSA entries found"
          description="Try changing your search or filters to find DSA progress entries."
          onReset={() => {
            setSearch("");
            setActiveFilter("All");
            setPage(1);
          }}
        />
      ) : (
        <>
          <div className={"grid gap-6 sm:grid-cols-2 xl:grid-cols-3"}>
            {dsaList.map((item) => (
              <DSACard key={item._id} dsa={item} onDelete={handleDeleteDSA} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <button
                disabled={!pagination.hasPrevPage}
                onClick={() => setPage((prev) => prev - 1)}
                className="inline-flex items-center gap-1.5 border border-border bg-transparent px-6 py-[0.6rem] font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground disabled:pointer-events-none disabled:opacity-35"
              >
                <HiArrowLeft className="size-3.5" />
                Previous
              </button>

              <div className="border border-border bg-card/40 px-6 py-[0.6rem] font-mono text-[0.72rem] tracking-[0.05em] text-muted-foreground">
                Page{" "}
                <span className="font-medium text-foreground">
                  {pagination.currentPage}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {pagination.totalPages}
                </span>
              </div>

              <button
                disabled={!pagination.hasNextPage}
                onClick={() => setPage((prev) => prev + 1)}
                className="inline-flex items-center gap-1.5 border border-border bg-transparent px-6 py-[0.6rem] font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:text-foreground disabled:pointer-events-none disabled:opacity-35"
              >
                Next
                <HiArrowRight className="size-3.5" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default DSA;
