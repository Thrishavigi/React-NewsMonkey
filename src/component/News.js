import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
  
  constructor(){
    super();
    console.log("Hello I am a constructor from News Component");
    this.state={
      articles:[],
      loading:false
    }
  }
  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/everything?q=movies&apiKey=9c432e649a8f4226b27790a51bb02f13`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
    })
    this.props.setProgress(100);

}
async componentDidMount() {
  this.props.setProgress(100);
  console.log("cdm");

  const apiKey = process.env.REACT_APP_NEWS_API;
  let url = `https://newsapi.org/v2/everything?q=movies&apiKey=${apiKey}`;

  try {
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("API Response: ", parsedData);

    // Check if articles exist before updating state
    if (parsedData.articles) {
      console.log("Articles fetched:", parsedData.articles);
      this.setState({ articles: parsedData.articles });
    } else {
      console.log("No articles found");
    }
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}


  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top Headlines</h2>
        
        
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}/>
          </div>
        })}
          
          
        </div>
        
      </div>
    )
  }
}

export default News;



// import React, { Component } from 'react';
// import NewsItem from './NewsItem';

// export class News extends Component {
//   constructor() {
//     super();
//     console.log("Hello I am a constructor from News Component");
//     this.state = {
//       articles: [],
//       loading: false,
//       totalResults: 0,
//     };
//   }

//   // Method to fetch and update the news
//   async updateNews() {
//     this.props.setProgress(10);
//     let url = `https://newsapi.org/v2/everything&apiKey=${process.env.REACT_APP_NEWS_API}`;

//     this.setState({ loading: true });
//     try {
//       let data = await fetch(url);
//       this.props.setProgress(30);
//       let parsedData = await data.json();
//       this.props.setProgress(70);

//       console.log("Fetched Data:", parsedData); // Log the fetched data

//       if (parsedData.status === "ok" && parsedData.articles.length > 0) {
//         console.log("Articles fetched:", parsedData.articles);
//         this.setState({
//           articles: parsedData.articles,
//           totalResults: parsedData.totalResults,
//           loading: false,
//         });
//       } else {
//         console.log("No articles found or error in API");
//         this.setState({ articles: [], loading: false });
//       }
//     } catch (error) {
//       console.error("Error fetching news:", error);
//       this.setState({ loading: false });
//     }
//   }

//   async componentDidMount() {
//     this.props.setProgress(10);
//     console.log("componentDidMount - Fetching News");
  
//     const apiKey = process.env.REACT_APP_NEWS_API; // Make sure this is correctly loaded
//     let url = `https://newsapi.org/v2/everything&apiKey=${apiKey}`;
  
//     try {
//       let data = await fetch(url);
//       let parsedData = await data.json();
//       console.log("Parsed Data:", parsedData); // Log the entire API response
  
//       if (parsedData.status === "ok" && parsedData.articles && parsedData.articles.length > 0) {
//         console.log("Articles fetched:", parsedData.articles);
//         this.setState({
//           articles: parsedData.articles,
//           totalResults: parsedData.totalResults,
//           loading: false,
//         });
//       } else {
//         console.log("No articles found or error in API");
//         this.setState({ articles: [], loading: false });
//       }
//     } catch (error) {
//       console.error("Error fetching news:", error);
//       this.setState({ loading: false });
//     }
//     this.props.setProgress(100);
//   }

//   render() {
//     return (
//       <div className="container my-3">
//         <h2>NewsMonkey - Top Headlines</h2>

//         {/* Display loading state */}
//         {this.state.loading && <div>Loading...</div>}

//         <div className="row">
//           {/* Render articles if available */}
//           {this.state.articles && this.state.articles.length > 0 ? (
//             this.state.articles.map((element) => (
//               <div className="col-md-4" key={element.url}>
//                 <NewsItem
//                   title={element.title ? element.title.slice(0, 45) : ""}
//                   description={
//                     element.description ? element.description.slice(0, 88) : ""
//                   }
//                   imageUrl={element.urlToImage}
//                   newsUrl={element.url}
//                   author={element.author}
//                   publishedAt={element.publishedAt}
//                   source={element.source.name}
//                 />
//               </div>
//             ))
//           ) : (
//             <div>No articles available</div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// export default News;

