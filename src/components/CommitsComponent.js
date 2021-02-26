import React, { useEffect, useState } from "react";
import { Box, DataTable, Text, Heading } from "grommet";
import { useParams } from "react-router-dom";
import { baseURL } from "../route";

export default function CommitsComponent() {
  const { owner, id } = useParams();

  const [response, setResponse] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${baseURL}/repos/${owner}/${id}/commits`)
      .then((response) => response.json())
      .then((data) => {
        setResponse(data);
        setLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setLoading(false);
      });
  }, []);

  return (
    <Box pad="large" gap="medium">
      <Heading>Commits for Repo: {id}</Heading>
      <Box pad="small" background="lightGrey">
        {loading ? (
          <div>Loading...</div>
        ) : hasError ? (
          <div>An Error Occured...</div>
        ) : (
          <Box>
            <DataTable
              size="large"
              resizeable
              columns={[
                {
                  property: "commit.author.name",
                  header: <Text>Commit Author</Text>,
                  primary: true,
                },
                {
                  property: "url",
                  header: <Text>URL</Text>,
                  size: "medium",
                },
                {
                  property: "commit.message",
                  header: <Text>Commit Message</Text>,
                  size: "medium",
                },
              ]}
              data={response}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
