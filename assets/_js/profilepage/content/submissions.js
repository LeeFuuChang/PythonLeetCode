const content_inner_submissions_table_tbody = content_inner_submissions.querySelector("#content-inner-submissions-table-tbody");
function LoadSubmissionsTable(){
    fetch(
        `/account/get?get=recentsubmissions&username=${Profile_Owner["user_data"]["username"]}`,
        {method:"GET"}
    ).then(ares => {
        return ares.json();
    }).then(ares => {
        content_inner_submissions_table_tbody.innerHTML = "";

        let states_ref = {
            "AC":"Accepted", 
            "WA":"Wrong Answer", 
            "TLE":"Time Limit Exceed", 
            "MLE":"Memory Limit Exceed", 
            "RE":"Runtime Error", 
            "CE":"Compile Error",
            "SE":"Server Error"
        };

        fetch(
            "/views/problem_list?get=byid",
            {method:"GET"}
        ).then(bres => {
            return bres.json();
        }).then(bres => {
            ares["recentsubmissions"].forEach(submit => {
                let problem_id = submit["problem_id"];
                let problem_name = bres["problem_list"][submit["problem_id"]]["name"];
                let submit_result = states_ref[submit["result"]];
                let submit_time = submit["submit_time"];
                let passed = submit["result"]=="AC" ? "passed" : "failed";
                content_inner_submissions_table_tbody.insertAdjacentHTML("beforeend", `
                    <tr class="content-inner-submissions-table-row">
                        <td class="content-inner-submissions-table-column-id">${problem_id}</td>
                        <td class="content-inner-submissions-table-column-title">
                            <a class="content-inner-submissions-table-column-title-link" href="/views/problems/${problem_id}">
                                ${problem_name}
                            </a>
                        </td>
                        <td class="content-inner-submissions-table-column-result ${passed}">${submit_result}</td>
                        <td class="content-inner-submissions-table-column-time">${submit_time}</td>
                    </tr>
                `);
            });
        });

    });
};





function LoadSubmissions(){
    LoadSubmissionsTable();
};
