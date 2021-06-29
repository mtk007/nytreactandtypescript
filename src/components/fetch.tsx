import React, {Component} from 'react';
import DisplayResults from './display';
type AcceptedProps = {
    results: {
        response: {
            docs: {
                multimedia: {
                    url: string;
                },
                headline: {
                    main: string;
                },
                keywords: [
                    {value: string}
                ]
            }
        }
    },
    searchTerm: string,
    startDate?: string,
    endDate?: string,
    pageNumber: number,
}
export default class NytFetch extends Component<{}, AcceptedProps> {
    constructor(props: AcceptedProps) {
        super(props)
        this.state={
            results: {
                response: {
                    docs: {
                        multimedia: {
                            url: ''
                        },
                        headline: {
                            main: ''
                        },
                        keywords: [
                            {value: ''}
                        ]
                    }
                }
            },
            searchTerm: '',
            startDate: '',
            endDate: '',
            pageNumber: 0,
        }
    }
    fetchResults(e: any) {
        e.preventDefault();
        const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        const key = 'sOY5tyl2xd17ihXn16giBXmdALwdTlih';
        const url = `${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.searchTerm}`;
        fetch(url)
            .then(function (result) {
                return result.json();
            })
            .then(function (json) {
                console.log(json);
            })
    }
    handleSearchInput(e: any) {
        this.setState({
            searchTerm: e.target.value
        })
        console.log(this.state.searchTerm)
    }
//    changePageNumber = (event: any, direction: string) => {
//         event.preventDefault()
//         if (direction === 'down') {
//           if (this.state.pageNumber > 0) {
//             setState({this.state.pageNumber: - 1})
//             {this.fetchResults};
//           }
//         }
//         if (direction === 'up') {
//           setPageNumber(pageNumber + 1);
//           fetchResults();
//         }
//       }
    render(){
        return(
            <>
            <div>
                <input type="text" onChange={this.handleSearchInput.bind(this)} />
                <button onClick={this.fetchResults.bind(this)}>Submit</button>
                <DisplayResults />
            </div>
            </>
        )
    }
}