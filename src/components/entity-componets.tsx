import { PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew: never }
  | { onNew?: never; newButtonHref?: never }
);

export function EntityHeader({
  title,
  description,
  newButtonLabel,
  disabled,
  isCreating,
  onNew,
  newButtonHref,
}: EntityHeaderProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {onNew && !newButtonHref && (
        <Button size="sm" onClick={onNew} disabled={isCreating || disabled}>
          <PlusIcon className="mr-2 h-4 w-4" />
          {newButtonLabel}
        </Button>
      )}
      {newButtonHref && !onNew && (
        <Button size="sm" asChild>
          <Link href={newButtonHref} prefetch>
            <PlusIcon className="mr-2 h-4 w-4" />
            {newButtonLabel}
          </Link>
        </Button>
      )}
    </div>
  );
}

type EntityContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
};

export function EntityContainer({
  children,
  header,
  search,
  pagination,
}: EntityContainerProps) {
  return (
    <div className="p-4 md:px-10 h-full ">
      <div className="mx-auto max-w-7xl w-full flex flex-col gap-y-4 h-full">
        {header}

        <div className="flex flex-col gap-y-4 h-full">
          {search}
          {children}
        </div>
        <div className="mt-auto">
          {pagination}
        </div>
      </div>
    </div>
  );
}

interface EntitySearchProps {
  value: string;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export function EntitySearch({
  value,
  onSearch,
  placeholder = "Search",
}: EntitySearchProps) {
  return (
    <div className="relative ml-auto">
      <SearchIcon className="size-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        className="max-w-[200px] bg-background shadow-none border-border pl-8"
      />
    </div>
  );
}

interface EntityPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function EntityPagination({
  page,
  totalPages,
  onPageChange,
  disabled,
}: EntityPaginationProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4 w-full">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={disabled || page === 1}
          variant="outline"
          size="sm"
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={disabled || page === totalPages || totalPages === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
