import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

type Option = {
  label: string;
  value: string;
};

interface ComboBoxProps {
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ComboBox2({ options, onChange, placeholder }: ComboBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });

  const buttonRef = useRef<HTMLButtonElement>(null);

  // Position dropdown relative to button
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Trigger */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border rounded w-64 text-left"
      >
        {selected ? selected.label : placeholder ?? "Select..."}
      </button>

      {/* Dropdown using Portal */}
      {isOpen &&
        createPortal(
          <ul
            className="absolute bg-white border rounded shadow-lg"
            style={{
              position: "absolute",
              top: coords.top,
              left: coords.left,
              width: coords.width,
              zIndex: 1000,
            }}
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  setSelected(opt);
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {opt.label}
              </li>
            ))}
          </ul>,
          document.body // portal target
        )}
    </>
  );
}
