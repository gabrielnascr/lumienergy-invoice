import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../store";
import {
  deleteInvoice,
  fetchInvoices,
} from "../../../store/modules/invoices/invoiceSlice";
import { Invoice as InvoiceType } from "../../../@types";
import { FaFileDownload } from "react-icons/fa";
import { MdDelete, MdDeleteSweep, MdFolderDelete } from "react-icons/md";
import { closeModal, openModal } from "../../../store/modules/modal/modalSlice";
import FileUploadModal from "./Components/FileUploadModal";
import Loading from "../../../components/Loading";
import DeleteModal from "./Components/DeleteModal";

const Invoice: React.FC = () => {
  const { invoices, loading, error } = useSelector(
    (state: RootState) => state.invoice
  );

  useEffect(() => {
    store.dispatch(fetchInvoices(""));
  }, []);

  const downloadInvoice = async (id: string) => {
    try {
      const invoice = invoices.filter((invoice) => invoice.id === id)[0];
      const invoicePath = invoice.invoicePath;

      const link = document.createElement("a");
      link.href = invoicePath;
      link.setAttribute("download", `invoice-${invoice.id}`);
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao baixar fatura:", error);
    }
  };
  if (loading) {
    return (
      <div className="w-full h-full relative">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-xl font-bold">Biblioteca de Faturas</h1>
        <button
          type="button"
          className="cursor bg-green-500 w-60 p-2 rounded-3xl text-white font-bold"
          // disabled={isSubmitting}
          onClick={() =>
            store.dispatch(
              openModal({
                container: <FileUploadModal />,
              })
            )
          }
        >
          Fazer upload de faturas
        </button>
      </div>
      <div className="h-96 overflow-auto">
        <table className="min-w-full bg-white ">
          <thead>
            <tr>
              <th className="py-2 text-left">Cliente</th>
              <th className="py-2 text-left">Número do Cliente</th>
              <th className="py-2 text-left">Mês de Referência</th>
              <th className="py-2 text-left">Custo Total</th>
              <th className="py-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="">
            {invoices.map((invoice: InvoiceType) => (
              <tr key={invoice.id}>
                <td className="py-2 text-left">{invoice.customerName}</td>
                <td className="py-2 text-left">{invoice.customeNumber}</td>
                <td className="py-2 text-left">{invoice.referenceMonth}</td>
                <td className="py-2 text-left">{invoice.totalCost}</td>
                <td className="py-2 text-left flex justify-center gap-5">
                  <button
                    // onClick={() => downloadInvoice(invoice.id)}
                    onClick={() => downloadInvoice(invoice.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    <FaFileDownload />
                  </button>
                  <button
                    onClick={() =>
                      store.dispatch(
                        openModal({
                          container: (
                            <DeleteModal
                              onDelete={() => {
                                store.dispatch(deleteInvoice(invoice.id));
                                store.dispatch(closeModal());
                              }}
                            />
                          ),
                        })
                      )
                    }
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
    </div>
  );
};

export default Invoice;
