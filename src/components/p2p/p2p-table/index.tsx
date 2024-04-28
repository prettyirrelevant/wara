import "./p2p-table.scss";

import { flexRender, useReactTable, getCoreRowModel, createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { useApp, useModal } from "contexts";
import { Advert } from "types/Ads";
import { truncate } from "utils/HelperUtils";
import WalletIcon from "components/common/wallet-icon";

const columnHelper = createColumnHelper<Advert>();

interface P2PTableProps {
  displayType: "buy" | "sell";
}

const P2PTable = ({ displayType }: P2PTableProps) => {
  const { buyAds, sellAds } = useApp();
  const { openModal, setAdvert } = useModal();

  const columns = [
    columnHelper.accessor("merchant", {
      header: "Merchant",
      cell: (cellProps) => (
        <div className="wallet-block">
          <WalletIcon size={24} address={cellProps.cell.getValue()} />
          <p>{truncate(cellProps.cell.getValue())}</p>
        </div>
      ),
    }),

    columnHelper.accessor("price", {
      header: "Price",
      cell: (cellProps) => cellProps.cell.getValue() + " NGN",
    }),

    columnHelper.accessor("token", {
      header: "Token",
      cell: (cellProps) => (
        <div className="wallet-block">
          <img
            src={
              cellProps.row.original.adTypeText === "Buy"
                ? "https://flagicons.lipis.dev/flags/4x3/ng.svg"
                : "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg"
            }
            alt=""
          />
          {/* <WalletIcon size={24} address={cellProps.cell.getValue()} /> */}
          <p>
            {cellProps.row.original.adTypeText === "Buy" ? "NGN" : "USDC"}
            {/* {truncate(cellProps.cell.getValue())} */}
          </p>
        </div>
      ),
    }),

    columnHelper.accessor("quantity", {
      header: "Quantity",
      cell: (cellProps) => cellProps.cell.getValue(),
    }),

    columnHelper.accessor("adType", {
      header: "Trade",
      cell: (cellProps) => (
        <div className="trade-btn__container">
          <button
            onClick={() => {
              if (cellProps.row.original.adTypeDisplay === "Sold Out") return;
              setAdvert(cellProps.row.original);
              openModal("trade");
            }}
            className="trade-btn"
            data-adtype={
              cellProps.row.original.adTypeDisplay === "Sold Out"
                ? "sold-out"
                : cellProps.row.original.adTypeText === "Sell"
                  ? "buy"
                  : "sell"
            }
          >
            {cellProps.row.original.adTypeDisplay}
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    columns,
    getCoreRowModel: getCoreRowModel(),
    data: displayType === "buy" ? buyAds : sellAds,
  });

  return (
    <div className="p2p-table">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default P2PTable;
