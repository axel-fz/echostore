'use client';

import React, { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import emailjs from "@emailjs/browser";
import { Mail, Phone, Send } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const formRef = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm("service_wby1hvu", "template_kofipjq", formRef.current!, {
        publicKey: "UVxFQmLjNT6_o64YR",
      })
      .then(() => {
        toast.success(t("messageSent"));
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      })
      .catch(() => toast.error(t("messageFailed")))
      .finally(() => setLoading(false));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t("emailUsTitle"),
      content: "edgarfezeu@gmail.com",
      link: "mailto:edgarfezeu@gmail.com",
    },
    {
      icon: Phone,
      title: t("callUsTitle"),
      content: "+237 693 143 459",
      link: "tel:+237693143459",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <ToastContainer position="top-center" />

      {/* HERO */}
      <div className="relative mx-2 lg:mx-45 overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-black py-16 mt-8 sm:py-20">
        {/* Blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-60 h-60 sm:w-72 sm:h-72 bg-indigo-300 dark:bg-indigo-900/30 rounded-full blur-xl opacity-70 animate-blob" />
          <div className="absolute top-40 right-10 w-60 h-60 sm:w-72 sm:h-72 bg-purple-300 dark:bg-purple-900/30 rounded-full blur-xl opacity-70 animate-blob animation-delay-2000" />
        </div>

        <div className="relative z-10 container py-20 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-900 dark:text-white mb-4">
            {t("heroTitle")}
          </h1>
          <p className="text-base sm:text-lg text-indigo-700 dark:text-indigo-300 max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-black border border-indigo-100 dark:border-indigo-900/50 rounded-2xl p-6 sm:p-8 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                {t("formTitle")}
              </h2>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {["firstName", "lastName"].map((field) => (
                    <input
                      key={field}
                      name={field}
                      placeholder={t(field)}
                      value={(formData as any)[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused(null)}
                      className={`w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-900 ${
                        focused === field
                          ? "border-indigo-500"
                          : "border-indigo-200 dark:border-indigo-800"
                      }`}
                      required
                    />
                  ))}
                </div>

                {/* Email */}
                <input
                  name="email"
                  type="email"
                  placeholder={t("email")}
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-900 border-indigo-200 dark:border-indigo-800"
                  required
                />

                {/* Subject */}
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-900 border-indigo-200 dark:border-indigo-800"
                  required
                >
                  <option value="">{t("selectTopic")}</option>
                  <option value="general">{t("topicGeneral")}</option>
                  <option value="order">{t("topicOrder")}</option>
                  <option value="product">{t("topicProduct")}</option>
                  <option value="feedback">{t("topicFeedback")}</option>
                </select>

                {/* Message */}
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 bg-white dark:bg-gray-900 border-indigo-200 dark:border-indigo-800 resize-none"
                  placeholder={t("messagePlaceholder")}
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-900 dark:bg-indigo-600 text-white py-4 rounded-lg flex justify-center gap-2 hover:bg-indigo-800 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                  {loading ? t("sending") : t("sendMessage")}
                </button>
              </form>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 border rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-4">{t("contactInfoTitle")}</h3>
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.link}
                    className="flex gap-3 p-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                  >
                    <Icon className="h-5 w-5 text-indigo-600" />
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm">{item.content}</div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
