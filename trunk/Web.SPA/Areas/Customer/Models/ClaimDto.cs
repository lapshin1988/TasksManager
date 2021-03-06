﻿using Model;
using System;

namespace Web.SPA.Areas.Customer.Models
{
    public class ClaimDto
    {
        public Guid? Id { get; set; }

        public DateTime? Created { get; set; }

        public string Title { get; set; }

        public string Comment { get; set; }

        public TaskPriority Priority { get; set; }

        public TaskType Type { get; set; }

        public bool InArchive { get; set; }
    }
}