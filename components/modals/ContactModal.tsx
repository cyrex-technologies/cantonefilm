'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, User, Mail, Phone, MessageSquare, Building, FileText } from 'lucide-react';
import Button from '@/components/ui/Button';

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
};

const services = [
  'Documentary Production',
  'Commercial Films',
  'Educational Content',
  'Event Coverage',
  'Corporate Videos',
  'Other',
];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      window.requestAnimationFrame(() => {
        modalRef.current
          ?.querySelector<HTMLButtonElement>('button[aria-label="Close modal"]')
          ?.focus();
      });
    } else {
      document.body.style.overflow = 'unset';
      previousFocusRef.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleTab = (e: KeyboardEvent) => {
      if (!isOpen || e.key !== 'Tab') return;

      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const focusables = Array.from(focusableElements);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (e.shiftKey && activeElement === first) {
        e.preventDefault();
        last.focus();
        return;
      }

      if (!e.shiftKey && activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleEscape);
    window.addEventListener('keydown', handleTab);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('keydown', handleTab);
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('company', formData.company);
      payload.append('service', formData.service);
      payload.append('message', formData.message);

      const response = await fetch('https://usebasin.com/f/9ff4d58c8d07', {
        method: 'POST',
        body: payload,
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      
      // Reset form after success
      timeoutRef.current = window.setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
        });
        setSubmitStatus('idle');
        onClose();
      }, 2000);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn"
        onClick={onClose}
      >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy/95 backdrop-blur-sm z-0" />

      {/* Modal */}
      <div 
        ref={modalRef}
        className="relative z-10 bg-cream w-full max-w-4xl max-h-[90vh] overflow-y-auto contact-modal-animate"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        aria-describedby="contact-modal-description"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-navy to-brown p-6 md:p-8 z-10">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6 h-10 w-10 text-cream hover:bg-cream/10"
            ariaLabel="Close modal"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </Button>

          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-gold" />
              <span className="text-gold font-medium tracking-widest text-sm uppercase">
                Get In Touch
              </span>
            </div>
            
            <h2 id="contact-modal-title" className="text-4xl md:text-5xl font-bold text-cream mb-4">
              Let&apos;s Create Something
              <br />
              <span className="text-gold">Extraordinary</span>
            </h2>
            
            <p id="contact-modal-description" className="text-cream/80 text-lg">
              Tell us about your project and let&apos;s bring your vision to life.
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 md:p-8 lg:p-12">
          {submitStatus === 'success' ? (
            // Success Message
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-10 h-10 text-gold" />
              </div>
              <h3 className="text-3xl font-bold text-navy mb-4">Thank You!</h3>
              <p className="text-brown/80 text-lg max-w-md mx-auto">
                Your message has been sent successfully. We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            // Contact Form
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Form Fields */}
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 text-navy font-medium mb-3 text-sm">
                    <User className="w-4 h-4 text-gold" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white border-2 border-brown/20 text-navy placeholder:text-brown/40 focus:outline-none focus:border-gold transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-navy font-medium mb-3 text-sm">
                    <Mail className="w-4 h-4 text-gold" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-white border-2 border-brown/20 text-navy placeholder:text-brown/40 focus:outline-none focus:border-gold transition-all duration-300"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 text-navy font-medium mb-3 text-sm">
                    <Phone className="w-4 h-4 text-gold" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+255 123 456 789"
                    className="w-full px-4 py-3 bg-white border-2 border-brown/20 text-navy placeholder:text-brown/40 focus:outline-none focus:border-gold transition-all duration-300"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="flex items-center gap-2 text-navy font-medium mb-3 text-sm">
                    <Building className="w-4 h-4 text-gold" />
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="w-full px-4 py-3 bg-white border-2 border-brown/20 text-navy placeholder:text-brown/40 focus:outline-none focus:border-gold transition-all duration-300"
                  />
                </div>
              </div>

              {/* Right Column - Service & Message */}
              <div className="space-y-6">
                {/* Service */}
                <div>
                  <label className="flex items-center gap-2 text-navy font-medium mb-3 text-sm">
                    <FileText className="w-4 h-4 text-gold" />
                    Service Interested In *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-brown/20 text-navy focus:outline-none focus:border-gold transition-all duration-300"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex-1">
                  <label className="flex items-center gap-2 text-navy font-medium mb-3 text-sm">
                    <MessageSquare className="w-4 h-4 text-gold" />
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 bg-white border-2 border-brown/20 text-navy placeholder:text-brown/40 focus:outline-none focus:border-gold transition-all duration-300 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {submitStatus !== 'success' && (
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                variant="primary"
                size="md"
                className="w-full sm:w-auto font-bold hover:scale-105 md:px-8 md:py-4 md:text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </Button>

              <p className="text-brown/60 text-sm">
                * Required fields
              </p>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 text-red-800">
              <p className="font-medium">Something went wrong. Please try again.</p>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brown/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .contact-modal-animate {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  , document.body);
}
