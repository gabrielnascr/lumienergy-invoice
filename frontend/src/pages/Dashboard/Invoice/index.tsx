import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../store";
import { fetchInvoices } from "../../../store/modules/invoices/invoiceSlice";
import { Invoice as InvoiceType } from "../../../@types";
import { FaFileDownload } from "react-icons/fa";
import { MdDelete, MdDeleteSweep, MdFolderDelete } from "react-icons/md";

const Invoice: React.FC = () => {
  const { invoices, loading, error } = useSelector(
    (state: RootState) => state.invoice
  );

  useEffect(() => {
    store.dispatch(fetchInvoices(""));
  }, []);

  // const downloadInvoice = async (id: string) => {
  //   try {
  //     const response = await fetch(`/api/invoices/${id}/download`, {
  //       method: 'GET',
  //     });
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', `invoice-${id}.pdf`); // ou qualquer extensão que seu arquivo tiver
  //     document.body.appendChild(link);
  //     link.click();
  //     link.parentNode.removeChild(link);
  //   } catch (error) {
  //     console.error('Erro ao baixar fatura:', error);
  //   }
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full p-4">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-xl font-bold">Biblioteca de Faturas</h1>
        <button
          type="button"
          className="cursor bg-green-500 w-60 p-2 rounded-3xl text-white font-bold"
          // disabled={isSubmitting}
        >
          Fazer upload de faturas
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-left">Cliente</th>
            <th className="py-2 text-left">Número do Cliente</th>
            <th className="py-2 text-left">Mês de Referência</th>
            <th className="py-2 text-left">Custo Total</th>
            <th className="py-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice: InvoiceType) => (
            <tr key={invoice.id}>
              <td className="py-2 text-left">{invoice.customerName}</td>
              <td className="py-2 text-left">{invoice.customeNumber}</td>
              <td className="py-2 text-left">{invoice.referenceMonth}</td>
              <td className="py-2 text-left">{invoice.totalCost}</td>
              <td className="py-2 text-left flex justify-center gap-5">
                <button
                  // onClick={() => downloadInvoice(invoice.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  <FaFileDownload />
                </button>
                <button
                  // onClick={() => downloadInvoice(invoice.id)}
                  className="bg-[#FF5A5F] text-white px-4 py-2 rounded"
                >
                  <MdDeleteSweep />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoice;
