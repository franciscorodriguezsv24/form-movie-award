import { useState } from "react"

export const Combobox = () => {
    const [input, setInput] = useState('')
    const [returnValue, setReturnValue] = useState ('')
    const [showUl, setShowUl] = useState(false)

    //TURN INTO PROPS
        const title = 'test'
        const array = [
            { id: 1, name: 'eins' },
            { id: 2, name: 'zwei' },
            { id: 3, name: 'polizei' },
        ]
    //end of props

    const filteredArray = (
        input
        ? array.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
        : array
    )

    const handleSelect = (name: string, id: string) => {
        setInput(name) // does not happen.
        setReturnValue(id) // does not happen.
        setShowUl(false)
        console.log(`input is now ${input}`) // does not happen.
    }

    return (
        <div>
            <input
                id={`${title}_input`}
                type="text"
                placeholder='choose an option'
                value={input}
                onChange={e => {setInput(e.target.value)}}
                onFocus={() => {setShowUl(true)}}
            />
            <input
                id={`${title}_id`}
                type="hidden"
                value={returnValue}
            />
            {showUl &&
                <ul>
                    {filteredArray.map(item => (
                        <li
                            key={item.id}
                            onClick={() => handleSelect(item.name, String(item.id))}
                        >{item.name}</li>
                    ))}
                </ul>
            }
        </div>
    )
}