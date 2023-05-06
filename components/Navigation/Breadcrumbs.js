// components/Navigation/Breadcrumbs.js
import Link from "next/link";

function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs">
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && ">"}
          <Link href={item.href}>{item.label}</Link>
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
