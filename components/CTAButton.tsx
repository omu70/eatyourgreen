"use client";
import { Button, type ButtonProps } from "@/components/ui/button";
import { track } from "@/lib/analytics";

type Props = ButtonProps & {
  href: string;
  label: string;
  value?: number;          // price in INR
  contentId?: string;      // product/book slug
  contentName?: string;    // product/book title
};

export default function CTAButton({
  href,
  label,
  value = 0,
  contentId = "guide",
  contentName = "The Eat Your Green Guide",
  ...rest
}: Props) {
  const onClick = () => {
    track("begin_checkout", {
      value,
      currency: "INR",
      content_name: contentName,
      content_ids: [contentId],
      content_type: "product",
      items: [{ item_id: contentId, item_name: contentName, price: value, quantity: 1 }],
    });
  };
  return (
    <Button asChild {...rest}>
      <a href={href} onClick={onClick} rel="noopener">
        {label}
      </a>
    </Button>
  );
}
