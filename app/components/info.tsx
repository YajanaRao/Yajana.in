import * as React from "react";
import dayjs from "dayjs";

function Info({ title, date }: { title: string; date: string }) {
  return (
    <div>
      <h1 className="mb-2 font-heading font-extrabold italic text-ink-primary">
        {title}
      </h1>
      <p className="my-0 font-ui text-sm text-ink-secondary">
        <time dateTime={date}>{dayjs(date).format("MMMM D, YYYY")}</time>
      </p>
    </div>
  );
}

export default Info;
