/**
 *
 * Function to sort the results in the cheapes way possible
 *
 * @param {Array} results - array of products
 *
 * */

export default function sortResultsByPrice(results: any[]) {
  if (results.length > 1)
    return results.sort(function (a, b) {
      const getPrice = (product: any) => {
        if (product.discountPrice) {
          return product.discountPrice; // Use discounted price with card if available
        }

        return product.price; // Use regular price if no discounts apply
      };

      const priceA = getPrice(a);
      const priceB = getPrice(b);

      return priceA - priceB; // Ascending order, modify as needed
    });
  else return results;
}
