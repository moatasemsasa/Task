using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly DataContext dataContext;
        public EmployeesController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add")]
        public async Task<Employee> AddTable(Employee Employee)
        {
            this.dataContext.Employees.Add(Employee);
            await this.dataContext.SaveChangesAsync();
            return Employee;
        }
    }
}
