import React, { createContext, useState, ReactNode } from "react";

interface filtersI {
    minRating: number,
    adults: number,
    children: number,
    [filters: string]: any,
}

interface contextI {
    filters: filtersI,
    handleFilters: Function
}

const FilterContext = createContext<contextI>({} as contextI);

export const FilterProvider = ({ children }: { children: ReactNode }) => {

    const [filters, setFilters] = useState<filtersI>({
        minRating: 3,
        adults: 2,
        children: 0
    })

    //If filter action type is a string, increment or decrement based on value. Else set it to the value
    const handleFilters = (option: number, action: string) => {
        setFilters((prev) => {
            return {
                ...prev,
                [option]: typeof action === "string" ?
                    action === "increase" ? filters[option] + 1 : filters[option] - 1 : action
            }
        })
    }

    return (
        <FilterContext.Provider value={{ filters, handleFilters }}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterContext