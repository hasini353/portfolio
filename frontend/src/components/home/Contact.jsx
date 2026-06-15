import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-24 bg-[#050505] border-t border-white/10"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4"
          >
            <div className="w-12 h-[2px] bg-[#FF1E1E]" />
            <h2 className="text-sm font-mono text-[#FF1E1E] tracking-[0.3em] uppercase font-bold">
              Let's Connect
            </h2>
            <div className="w-12 h-[2px] bg-[#FF1E1E]" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter"
          >
            Contact Me
          </motion.h3>

        </div>

        {/* Contact Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="glass-panel border border-[#FF1E1E]/30 bg-[#0A0A0A] relative overflow-hidden"
        >
          <div className="p-10 md:p-16 flex flex-col items-center justify-center text-center">
                <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#A0A0A0] text-center max-w-2xl"
          >
            I'd love to hear from you! Feel free to reach out via email.
          </motion.p>
            

            <a
              href="mailto:anuhasini353@gmail.com"
              className="text-xl md:text-3xl font-mono text-white hover:text-[#FF1E1E] transition-colors duration-300 break-all"
            >
              anuhasini353@gmail.com
            </a>

          </div>

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FF1E1E]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#FF1E1E]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#FF1E1E]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FF1E1E]" />
        </motion.div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-[#666] text-sm">
            © 2026 Hasini Gundubogula. All Rights Reserved.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Contact;

