import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiManager from "../../api/apiManager";
import { Loading } from "../../common/Loading";
import { toast } from "react-toastify";

const OrderTrackingPage = () => {
  const { token } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const json = await apiManager.getOrderTracking(token);
      if (json && json.order_id) {
        setOrder(json);
      } else {
        toast.error("No se encontró la orden especificada.");
      }
    } catch (error) {
      console.error("Error fetching order tracking:", error);
      toast.error("Error al cargar el seguimiento.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchOrder, 30000);
    return () => clearInterval(interval);
  }, [token]);

  if (loading) return <Loading />;

  if (!order) {
    return (
      <div className="flex flex-col my-20 justify-center items-center">
        <h2 className="text-2xl font-bold">Orden no encontrada</h2>
        <Link to="/" className="btn-main mt-5">Ir al inicio</Link>
      </div>
    );
  }

  // Stepper logic
  const steps = [
    { id: "pending", label: "Pedido Recibido", description: "Esperando comprobante" },
    { id: "paid", label: "Pago Verificado", description: "Confirmado por YaVoy" },
    { id: "preparing", label: "En Cocina", description: "El restaurante prepara tu orden" },
    { id: "shipping", label: "De Camino", description: "El repartidor va hacia la entrega" },
    { id: "complete", label: "Entregado", description: "¡Buen provecho!" },
  ];

  const getActiveStep = (status) => {
    switch (status) {
      case "pending": return 0;
      case "paid": return 1;
      case "active": return 2; // Assuming active means in preparation
      case "shipping": return 3;
      case "complete": return 4;
      default: return 0;
    }
  };

  const activeStepIndex = getActiveStep(order.status);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seguimiento de Pedido</h1>
            <p className="text-gray-500">Orden #{order.order_id} • {order.client_name}</p>
          </div>
          <button 
            onClick={fetchOrder}
            className="flex items-center gap-2 text-main font-semibold hover:underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar estado
          </button>
        </div>

        {/* Stepper */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 hidden md:block">
              <div 
                className="h-full bg-main transition-all duration-500" 
                style={{ width: `${(activeStepIndex / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>

            <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-0">
              {steps.map((step, index) => (
                <div key={step.id} className="flex md:flex-col items-center flex-1 text-center group">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-300 ${
                      index <= activeStepIndex ? "bg-main text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index < activeStepIndex ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="ml-4 md:ml-0 md:mt-3 text-left md:text-center">
                    <p className={`font-bold text-sm ${index <= activeStepIndex ? "text-gray-900" : "text-gray-400"}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-500 hidden md:block">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Productos</h3>
              <div className="divide-y divide-gray-100">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="py-4 flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center font-bold text-gray-600">
                        {item.quantity}x
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">${Number(item.price).toFixed(2)} c/u</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900">${(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span className="text-main">${Number(order.total).toFixed(2)} USD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 text-gray-800">¿Necesitas Ayuda?</h3>
              <p className="text-sm text-gray-600 mb-6">Si tienes alguna duda sobre tu pedido o el pago, contáctanos por WhatsApp.</p>
              <a 
                href={order.whatsapp_url || `https://wa.me/yavoy`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors uppercase text-sm"
              >
                <img src="/assets/img/wa.png" className="h-5 w-5 brightness-0 invert" alt="" />
                Chat de Soporte
              </a>
            </div> */}

            {order.status === 'pending' && (
              <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                <h3 className="font-bold text-yellow-800 mb-2 font-lg">Acción Requerida</h3>
                <p className="text-sm text-yellow-700 mb-4">Aún no hemos confirmado tu pago. Envía el comprobante de Zelle por WhatsApp para activar tu orden.</p>
                <div className="text-xs space-y-2 text-yellow-800">
                  <p><strong>Zelle:</strong> servicios@yavoycuba.com</p>
                  <p><strong>Total:</strong> ${Number(order.total).toFixed(2)} USD</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;