import clsx from "clsx";
import { PropsWithChildren } from "react";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export const Table: React.FC<TableProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div className="my-6 overflow-x-auto">
            <table
                className={clsx(
                    "w-full table-auto border-collapse text-left text-sm md:text-base",
                    "border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-gray-dark",
                    className,
                )}
                {...props}
            >
                {children}
            </table>
        </div>
    );
};

interface TableHeadProps
    extends React.HTMLAttributes<HTMLTableSectionElement> {}
export const TableHead: React.FC<TableHeadProps> = ({
    className,
    children,
    ...props
}) => (
    <thead
        className={clsx(
            "bg-zinc-100 text-zinc-700 dark:bg-gray-900 dark:text-zinc-200",
            className,
        )}
        {...props}
    >
        {children}
    </thead>
);

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}
export const TableRow: React.FC<TableRowProps> = ({
    className,
    children,
    ...props
}) => (
    <tr
        className={clsx(
            "border-t border-zinc-200 dark:border-zinc-700",
            className,
        )}
        {...props}
    >
        {children}
    </tr>
);

interface TableHeaderCellProps
    extends React.ThHTMLAttributes<HTMLTableCellElement> {}
export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
    className,
    children,
    ...props
}) => (
    <th className={clsx("px-4 py-3 font-semibold", className)} {...props}>
        {children}
    </th>
);

export const TableBody: React.FC<PropsWithChildren> = ({
    // className,
    children,
    ...props
}) => (
    <tbody className={clsx("px-4 py-3 font-semibold")} {...props}>
        {children}
    </tbody>
);

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}
export const TableCell: React.FC<TableCellProps> = ({
    className,
    children,
    ...props
}) => (
    <td className={clsx("px-4 py-3 text-body-color", className)} {...props}>
        {children}
    </td>
);
