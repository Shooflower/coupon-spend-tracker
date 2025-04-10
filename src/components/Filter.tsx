import {useEffect, useState} from "react"
import { useSearchParams } from "react-router-dom"
import { apiServer } from "../server"
import cvs from "../assets/cvs.svg"
import walgreens from "../assets/walgreens.png"
import walmart from "../assets/walmart.jpg"
import publix from "../assets/publix.jpg"
import winndixie from "../assets/winn-dixie.png"
import target from "../assets/target.jpg"
import misc from "../assets/pencil.png"

export default function Filter(props: any) {
    const {handleFilter} = props

    const [filters, setFilters] = useState<string[]>([])

    // Fetch call to retrieve the list of stores
    useEffect(() => {
        fetch(`${apiServer}/store`)
        .then(response => response.json())
        .then(data => setFilters(data.result))
    }, [])

    const [searchParams, setSearchParams] = useSearchParams()
    const storeQuery = searchParams.get("store")
    const activeFilters = storeQuery ? filters.filter(f => f.toLowerCase() === storeQuery) : filters

    const filterButtons = activeFilters.map((filterOption:string) => {
        let image = ""
        switch(filterOption.toLowerCase()) {
            case "cvs":
                image = cvs
                break
            case "walgreens":
                image = walgreens
                break
            case "walmart":
                image = walmart
                break
            case "publix":
                image = publix
                break
            case "target":
                image = target
                break
            case "winn-dixie":
                image = winndixie
                break
        }

        return <img className="filter--img" src={image} key={filterOption} onClick={() => handleFilter("store", filterOption)}/>
    })

    return (
        <div className="filter">
            {filterButtons}
            <button onClick={() => handleFilter("store", null)} className="filter--clear">Clear Filter</button>
        </div>
    )
}