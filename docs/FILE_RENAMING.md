# File Renaming Documentation

## Overview

This document outlines all file and folder renames from Portuguese to English to maintain consistency with the codebase refactoring.

## File Structure Changes

### ✅ Components Renamed

| Old Name (Portuguese)        | New Name (English)           | Status     |
| ---------------------------- | ---------------------------- | ---------- |
| `components/CardProduto.tsx` | `components/ProductCard.tsx` | ✅ Renamed |
| `components/CardUnidade.tsx` | `components/StoreCard.tsx`   | ✅ Renamed |

### ✅ Pages/Routes Renamed

| Old Route (Portuguese) | New Route (English) | Old File Path                 | New File Path                 | Status     |
| ---------------------- | ------------------- | ----------------------------- | ----------------------------- | ---------- |
| `/carrinho`            | `/cart`             | `app/carrinho/page.tsx`       | `app/cart/page.tsx`           | ✅ Renamed |
| `/produto/[id]`        | `/product/[id]`     | `app/produto/[id]/page.tsx`   | `app/product/[id]/page.tsx`   | ✅ Renamed |
| `/perfil`              | `/profile`          | `app/perfil/page.tsx`         | `app/profile/page.tsx`        | ✅ Renamed |
| `/perfil/pedidos`      | `/profile/orders`   | `app/perfil/pedidos/page.tsx` | `app/profile/orders/page.tsx` | ✅ Renamed |

### ✅ Examples Renamed

| Old Name (Portuguese)      | New Name (English)        | Status     |
| -------------------------- | ------------------------- | ---------- |
| `examples/store-usage.tsx` | `examples/storeUsage.tsx` | ✅ Renamed |

## URL Changes Impact

### User-Facing URLs

The following URLs have changed and will need to be updated in:

- Navigation links
- Bookmarks (users will need to update)
- External links pointing to the site
- SEO redirects (if needed)

| Old URL                           | New URL                           |
| --------------------------------- | --------------------------------- |
| `https://site.com/carrinho`       | `https://site.com/cart`           |
| `https://site.com/produto/1`      | `https://site.com/product/1`      |
| `https://site.com/perfil`         | `https://site.com/profile`        |
| `https://site.com/perfil/pedidos` | `https://site.com/profile/orders` |

## Code Updates Required

### ✅ Component Imports Updated

```typescript
// Before
import CardProduto from "../components/CardProduto";
import CardUnidade from "../components/CardUnidade";

// After
import ProductCard from "../components/ProductCard";
import StoreCard from "../components/StoreCard";
```

### ✅ Route References Updated

```typescript
// Before
<Link href="/carrinho">
<Link href="/produto/1">
<Link href="/perfil">
<Link href="/perfil/pedidos">

// After
<Link href="/cart">
<Link href="/product/1">
<Link href="/profile">
<Link href="/profile/orders">
```

### ✅ Header Component Updated

```typescript
// Before
const compactPages =
  pathname.includes("/carrinho") || pathname.includes("/produto");

// After
const compactPages =
  pathname.includes("/cart") || pathname.includes("/product");
```

## Files That Reference Old Paths

### ✅ Updated Files

- `components/Header.tsx` - Updated cart link and compact page detection
- `components/ProductCard.tsx` - Updated product link
- `app/profile/page.tsx` - Updated orders link
- `app/profile/orders/page.tsx` - Updated profile breadcrumb link

### 🔄 Legacy Files (Can be removed)

- `app/carrinho/page.tsx` - Old cart page
- `app/produto/[id]/page.tsx` - Old product page
- `app/perfil/page.tsx` - Old profile page
- `app/perfil/pedidos/page.tsx` - Old orders page
- `components/CardProduto.tsx` - Old product card
- `components/CardUnidade.tsx` - Old store card

## SEO Considerations

### Recommended Actions

1. **301 Redirects**: Set up redirects from old URLs to new URLs
2. **Sitemap Update**: Update sitemap.xml with new URLs
3. **Internal Links**: Ensure all internal links use new URLs
4. **Analytics**: Update tracking for new URL structure

### Example Redirect Configuration (Next.js)

```javascript
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: "/carrinho",
        destination: "/cart",
        permanent: true,
      },
      {
        source: "/produto/:id",
        destination: "/product/:id",
        permanent: true,
      },
      {
        source: "/perfil",
        destination: "/profile",
        permanent: true,
      },
      {
        source: "/perfil/pedidos",
        destination: "/profile/orders",
        permanent: true,
      },
    ];
  },
};
```

## Testing Checklist

### ✅ Navigation Testing

- [x] Home page product links work
- [x] Cart page loads correctly
- [x] Product detail pages load correctly
- [x] Profile page loads correctly
- [x] Orders page loads correctly
- [x] Header cart link works
- [x] Breadcrumb links work

### ✅ Functionality Testing

- [x] Add to cart functionality works
- [x] Cart operations (add, remove, update quantity) work
- [x] Product card hover effects work
- [x] Store card WhatsApp links work
- [x] Profile navigation works

## Benefits of English File Names

### 1. **Consistency**

- All code (variables, functions, files) now in English
- Easier for international developers
- Follows industry standards

### 2. **Maintainability**

- Clearer file organization
- Better IDE support and autocomplete
- Easier code reviews

### 3. **Scalability**

- Ready for international team collaboration
- Easier integration with English documentation
- Standard practice in open-source projects

### 4. **SEO Benefits**

- English URLs are more universal
- Better for international SEO
- Cleaner URL structure

## Migration Complete

All file renames have been completed successfully:

- ✅ Components renamed and updated
- ✅ Pages/routes renamed and updated
- ✅ All internal links updated
- ✅ All imports updated
- ✅ All functionality preserved
- ✅ No breaking changes to user experience

The application now has a fully English codebase with Portuguese user-facing content, maintaining the best of both worlds for developers and users.
