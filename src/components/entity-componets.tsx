import {
  AlertTriangleIcon,
  Loader2Icon,
  MoreVerticalIcon,
  PackageCheckIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
        <div className="mt-auto">{pagination}</div>
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

interface StateViewerProps {
  message?: string;
}

interface LoadingViewerProps extends StateViewerProps {
  entity?: string;
}

export function LoadingViewer({ message }: LoadingViewerProps) {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <Loader2Icon className="size-8 animate-spin text-primary" />
      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}

export function ErrorViewer({ message }: StateViewerProps) {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <AlertTriangleIcon className="size-8 text-primary" />
      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
}

interface EmptyViewerProps extends StateViewerProps {
  onNew?: () => void;
}

export function EmptyViewer({ message, onNew }: EmptyViewerProps) {
  return (
    <Empty className="border border-border bg-accent p-4">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <PackageCheckIcon />
        </EmptyMedia>
        <EmptyTitle>No items</EmptyTitle>
        {!!message && <EmptyDescription>{message}</EmptyDescription>}
        {onNew && (
          <EmptyContent>
            <Button size="sm" onClick={onNew}>
              Add item
            </Button>
          </EmptyContent>
        )}
      </EmptyHeader>
    </Empty>
  );
}

interface EntityListPros<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string;
  emptyView: React.ReactNode;
  className?: string;
}

export function EntityList<T>({
  items,
  renderItem,
  emptyView,
  getKey,
  className,
}: EntityListPros<T>) {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex-1 flex justify-center items-center ">
        <div className="max-w-sm mx-auto">{emptyView}</div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      {items.map((item, index) => (
        <div
          key={getKey ? getKey(item, index) : index}
          className="flex flex-col"
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

interface EntityItemPros {
  href: string;
  title: string;
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  action?: React.ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemovePending?: boolean;
  removeDisabled?: boolean;
  className?: string;
}

export function EntityItem({
  href,
  title,
  subtitle,
  image,
  action,
  onRemove,
  isRemovePending,
  removeDisabled,
  className,
}: EntityItemPros) {
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRemovePending || removeDisabled) {
      return;
    }
    if (onRemove) {
      await onRemove();
    }
  };
  return (
    <Link href={href} prefetch className="">
      <Card
        className={cn("p-4 shadow-none hover-shadow cursor-pointer", className)}
      >
        <CardContent className="flex flex-row items-center justify-between p-0">
          <div className="flex items-center gap-3">
            {image}
            <div>
              <CardTitle className="text-base font-medium">{title}</CardTitle>
              {!!subtitle && (
                <CardDescription className="text-sm text-muted-foreground">
                  {subtitle}
                </CardDescription>
              )}
            </div>
          </div>
          {(action || onRemove) && (
            <div className="flex items-center gap-x-4">
              {action}
              {onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVerticalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenuItem
                      onClick={handleRemove}
                      disabled={removeDisabled}
                    >
                      <TrashIcon className="size-4" /> Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
