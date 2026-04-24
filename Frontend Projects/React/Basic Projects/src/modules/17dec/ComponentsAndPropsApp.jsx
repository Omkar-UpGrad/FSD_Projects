function HSeperator() {
  return <hr className="border-gray-300" />;
}

function ProductCard({ data }) {
  return (
    <div className="flex flex-col shadow-md border border-gray-300">
      <h2 className="p-4 text-2xl">{data.name}</h2>

      <HSeperator />

      <p className="p-4">{data.description}</p>

      <HSeperator />

      <div className="grid grid-cols-2">
        <button className="p-2 px-4 bg-red-700 text-white">Add to Cart</button>
        <button className="p-2 px-4 bg-blue-950 text-white">Buy Now</button>
      </div>
    </div>
  );
}

export default function ComponentsAndPropsApp() {
  return (
    <div className="p-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProductCard
        data={{
          id: 1,
          name: "Havanai Guitar",
          description:
            "A havana-like guitar is a guitar which is like havana, but unlike havana which is guitar like havana, havana is not havana guitar havana's heaven",
        }}
      />
      <ProductCard
        data={{
          id: 2,
          name: "Epiphonae Guitar",
          description:
            "A havana-like guitar is a guitar which is like havana, but unlike havana which is guitar like havana, havana is not havana guitar havana's heaven",
        }}
      />
      <ProductCard
        data={{
          id: 3,
          name: "Corta Guitar",
          description:
            "A havana-like guitar is a guitar which is like havana, but unlike havana which is guitar like havana, havana is not havana guitar havana's heaven",
        }}
      />
    </div>
  );
}
