import React from "react";
import { Card } from "reactstrap";
import { CardBody } from "reactstrap";
import { CardTitle } from "reactstrap";
import { CardSubtitle } from "reactstrap";

import { CardText } from "reactstrap";
import { Badge } from "reactstrap";
import { Button } from "reactstrap";

const NewsItem = (props) => {
  let { title, discription, imageUrl, newsUrl, author, date, source } = props;
  return (
    // <h1>this is a news item</h1>
    <div className="container">
      <Card
        color="info"
        style={{
          width: "18rem",
        }}
      >
        <div>
          <Button color="primary" outline>
            <Badge>{source}</Badge>
          </Button>
        </div>
        <img
          alt="Sample"
          src={
            imageUrl
              ? imageUrl
              : "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"
          }
        />

        <CardBody>
          <CardTitle tag="h5">Top news</CardTitle>

          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {title}
          </CardSubtitle>
          <CardText>{discription}</CardText>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newsUrl} className="btn-sm">
            read more
          </a>
        </CardBody>
      </Card>
    </div>
  );
};

export default NewsItem;
