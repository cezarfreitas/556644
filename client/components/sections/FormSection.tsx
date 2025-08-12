import { memo, useState } from "react";
import { FaCheck, FaRocket, FaStore, FaGift } from "react-icons/fa";

interface FormSectionProps {
  data: {
    sectionTitle: string;
    benefits: Array<{
      title: string;
      description: string;
    }>;
    nameLabel: string;
    whatsappLabel: string;
    cnpjLabel: string;
    submitButtonText: string;
    consumerMessage: {
      title: string;
      description: string;
      discountText: string;
    };
  };
  formValues: {
    name: string;
    whatsapp: string;
    cnpj: string;
  };
  formErrors: { [key: string]: string };
  selectedCnpj: string;
  showCnpjField: boolean;
  showCouponMessage: boolean;
  isSubmitting: boolean;
  submitStatus: "idle" | "success" | "error";
  submitMessage: string;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWhatsAppChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCnpjChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCnpjRadioChange: (value: string) => void;
}

// Icons for benefits
const benefitIcons = [FaRocket, FaStore, FaGift, FaCheck];

function FormSection({
  data,
  formValues,
  formErrors,
  selectedCnpj,
  showCnpjField,
  showCouponMessage,
  isSubmitting,
  submitStatus,
  submitMessage,
  onFormSubmit,
  onNameChange,
  onWhatsAppChange,
  onCnpjChange,
  onCnpjRadioChange,
}: FormSectionProps) {
  return (
    <section className="py-20 bg-black text-white" id="formulario">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {data.sectionTitle}
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Benefits */}
            <div className="space-y-8">
              {data.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index] || FaCheck;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                      <Icon className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                      <p className="text-gray-300">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Form */}
            <div className="bg-white text-black p-8 rounded-xl shadow-2xl">
              <form onSubmit={onFormSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {data.nameLabel}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={onNameChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      formErrors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Digite seu nome completo"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>

                {/* WhatsApp Field */}
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">
                    {data.whatsappLabel}
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formValues.whatsapp}
                    onChange={onWhatsAppChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                      formErrors.whatsapp ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="(11) 99999-9999"
                  />
                  {formErrors.whatsapp && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.whatsapp}</p>
                  )}
                </div>

                {/* CNPJ Radio */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium">
                    Você possui CNPJ ativo?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="cnpj-option"
                        value="sim"
                        checked={selectedCnpj === "sim"}
                        onChange={(e) => onCnpjRadioChange(e.target.value)}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <span className="ml-2">Sim, possuo CNPJ ativo</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="cnpj-option"
                        value="nao-consumidor"
                        checked={selectedCnpj === "nao-consumidor"}
                        onChange={(e) => onCnpjRadioChange(e.target.value)}
                        className="text-orange-600 focus:ring-orange-500"
                      />
                      <span className="ml-2">Não possuo, mas tenho interesse</span>
                    </label>
                  </div>
                </div>

                {/* CNPJ Field */}
                {showCnpjField && (
                  <div className="animate-slide-up">
                    <label htmlFor="cnpj-number" className="block text-sm font-medium mb-2">
                      {data.cnpjLabel}
                    </label>
                    <input
                      type="text"
                      id="cnpj-number"
                      name="cnpj-number"
                      value={formValues.cnpj}
                      onChange={onCnpjChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        formErrors.cnpj ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="00.000.000/0000-00"
                    />
                    {formErrors.cnpj && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.cnpj}</p>
                    )}
                  </div>
                )}

                {/* Consumer Message */}
                {showCouponMessage && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 animate-slide-up">
                    <h4 className="font-bold text-orange-800 mb-2">
                      {data.consumerMessage.title}
                    </h4>
                    <p className="text-orange-700">
                      {data.consumerMessage.description}{" "}
                      <span className="font-bold text-orange-800">
                        {data.consumerMessage.discountText}
                      </span>
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-300"
                >
                  {isSubmitting ? "Enviando..." : data.submitButtonText}
                </button>

                {/* Status Message */}
                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(FormSection);
