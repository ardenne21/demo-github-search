import React, { useState } from "react";
import {
  Box,
  Button,
  DataTable,
  Heading,
  Text,
  TextInput,
  Image,
} from "grommet";
import { useHistory } from "react-router-dom";
import { baseURL } from "../route";

export default function ReposComponent() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchRepos = async () => {
    setLoading(true);
    fetch(`${baseURL}/orgs/${query}/repos`)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = formatData("REPO", data);
        setResponse(formattedData);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setHasError(true);
        setLoading(false);
      });
  };

  const fetchReposIssue = async () => {
    setLoading(true);
    fetch(`${baseURL}/search/issues?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = formatData("ISSUE", data.items);
        setResponse(formattedData);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setHasError(true);
        setLoading(false);
      });
  };

  return (
    <Box pad="large" gap="medium">
      <Heading>Search Github Repository</Heading>
      <Box direction="row" gap="large" justify="between">
        <Text size="large">Search by Repository Name or Issue</Text>
        <TextInput
          placeholder="Insert Name ( e.g: octokit )"
          size="medium"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </Box>

      <Box direction="row" justify="end" gap="small">
        <Button
          primary
          size="small"
          label="Search by Repo Name"
          onClick={fetchRepos}
        />
        <Button
          primary
          size="small"
          label="Search by Issue"
          onClick={fetchReposIssue}
        />
      </Box>

      <Box pad="small" background="lightGrey">
        {loading ? (
          <div>Loading...</div>
        ) : hasError ? (
          <div>An Error Occured...</div>
        ) : (
          <Box gap="small">
            <Heading level="3">Results</Heading>
            {response && Array.isArray(response) ? (
              <TableComponent data={response} />
            ) : (
              <Text>No repository found</Text>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

function TableComponent({ data }) {
  const history = useHistory();

  return (
    <DataTable
      onClickRow={(row) =>
        row.datum.owner
          ? history.push(`/commits/${row.datum.owner}/${row.datum.name}`)
          : null
      }
      columns={[
        {
          property: "name",
          header: <Text>Name</Text>,
          primary: true,
        },
        {
          property: "avatar_url",
          header: "Avatar",
          render: (row) => (
            <Box height="small" width="small" pad={{ vertical: "xsmall" }}>
              <Image fit="contain" src={row.avatar_url} />
            </Box>
          ),
        },
        {
          property: "created_at",
          header: <Text>Creation Date</Text>,
        },
      ]}
      data={data}
    />
  );
}

const formatData = (type, data) => {
  if (type === "REPO") {
    return data.map((el) => ({
      name: el.name,
      avatar_url: el.owner.avatar_url,
      created_at: el.created_at,
      owner: el.owner.login,
    }));
  } else if (type === "ISSUE") {
    return data.map((el) => ({
      name: el.title,
      avatar_url: el.user.avatar_url,
      created_at: el.created_at,
      owner: null,
    }));
  }
};
