import Button from "@/app/components/Button";
import { filterOptions } from "./constants";

const FilterPanel = () => {
  return (
    <div className="w-1/6">
      {filterOptions.map((filterOption) => (
        <div key={filterOption.value}>
          <h4 className="text-xl mt-4 mb-2">{filterOption.label}</h4>
          {filterOption.options.map((option) => (
            <div key={option.value} className="flex gap-2">
              <input
                name={filterOption.value}
                type={filterOption.type}
                value={option.value}
                id={option.label}
              />
              <label htmlFor={option.label}>{option.label}</label>
            </div>
          ))}
        </div>
      ))}
      <div className="w-1/2 my-4">
        <Button fullWidth={true}>
          <span className="text-base">Filtruj</span>
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
