import * as React from "react";
import dayjs from "dayjs";

function Info({ title, date }: { title: string; date: string }) {
  return (
    <div>
      <h1 className="mb-0 text-foreground">{title}</h1>
      <p className="mt-0 mb-0 text-muted-foreground">
        {" "}
        {dayjs(date).format("MMMM D, YYYY")}
      </p>
    </div>
  );
}

export default Info;
