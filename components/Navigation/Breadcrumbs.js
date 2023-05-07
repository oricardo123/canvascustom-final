import Link from "next/link";

function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs py-4 px-6 bg-gray-100 text-sm border-t border-b border-gray-300 w-full">
      {items.map((item, index) => (
        <span key={index} className="inline-flex items-center">
          {index > 0 && <span className="mx-2 ">&gt;</span>}
          <Link
            href={item.href}
            className="text-gray-600 hover:text-black inline-flex items-center"
          >
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
